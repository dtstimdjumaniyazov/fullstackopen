const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog } from '../helper'

const testUser = {
    username: 'e2eTest',
    name: 'e2e Test User',
    password: 'e2eTest'
}

const testBlog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'testurl.com'
}

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', { data: testUser })
        await page.goto('http://localhost:5173/login')
    })

    test('login succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, testUser.username, testUser.password)
        await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    })

    test('login fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'wronguser', 'wrongpassword')
        await expect(page.locator('[role="alert"]')).toBeVisible()
        await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible()
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, testUser.username, testUser.password)
            console.log('Logged in successfully')
        })

        test('a logged-in user can create a blog', async ({ page }) => {
            await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
            await expect(page.locator('[role="alert"]')).toContainText(`a new blog ${testBlog.title}`)
            await expect(page.locator(`div[class*="blog"] a:has-text("${testBlog.title}")`)).toBeVisible()
        })

        describe('when a blog exists', () => {
            beforeEach(async ({ page }) => {
                await createBlog(page, testBlog.title, testBlog.author, testBlog.url)
                await page.waitForURL('**/')
            })

            test('a logged-in user can like a blog', async ({ page }) => {
                await page.locator(`div[class*="blog"] a:has-text("${testBlog.title}")`).click()
                const likeButton = page.locator('button:has-text("like")')
                await likeButton.waitFor()
                await likeButton.click()
                await expect(page.locator('p:has-text("likes")')).toContainText('1 likes')
            })

            test('a logged-in user can delete a blog they created', async ({ page }) => {
                await page.locator(`div[class*="blog"] a:has-text("${testBlog.title}")`).click()
                page.on('dialog', dialog => dialog.accept())
                await page.locator('button:has-text("remove")').click()
                await page.waitForURL('**/')
                await expect(page.locator(`div[class*="blog"] a:has-text("${testBlog.title}")`)).not.toBeVisible()
            })
        })
    })
})
