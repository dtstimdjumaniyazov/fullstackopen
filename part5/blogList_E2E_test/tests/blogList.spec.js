const { test, expect, beforeEach, describe } = require('@playwright/test')
import { loginWith, createBlog, expandAndLikeBlog, expandBlogAndDelete } from '../helper'

const newUser = {
    username: 'e2eTest',
    name: 'e2e Test User',
    password: 'e2eTest'
}

const anotherUser = {
    username: 'anotherOne',
    name: 'anotherOne',
    password: 'anotherOne'
}

const newBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testURL.com'
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
        data: newUser
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('textbox', {name: 'username'}).waitFor()
    await page.getByRole('textbox', {name: 'password'}).waitFor()
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, newUser.username, newUser.password)
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'incorrectUsername', 'Password')
      await page.waitForSelector('div[class*="error"]', {timeout: 2000})
    })
  })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, newUser.username, newUser.password)
        })

        test('a new blog can be created', async ({ page }) => {
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url)
            console.log(`${newUser.username}`)
            await page.waitForTimeout(1000)
            expect(page.getByText(`a new blog ${newBlog.title} by ${newUser.username} added`)).toBeVisible()
        })
    })

    describe('Manipulations with Blogs', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, newUser.username, newUser.password)
            await createBlog(page,newBlog.title, newBlog.author, newBlog.url)
        })

        // ex. 5.20 
        test('Created blog could be liked', async ({ page }) => {
            await expandAndLikeBlog(page, newBlog.title, 2)
            const likeElement = await page.locator(`div[class*="blog"]:has(span:has-text("${newBlog.title}")) p:has-text("likes")`).textContent()
            expect(likeElement).toContain('likes 2')
        })

        // ex. 5.21
        test('Created blog could be deleted by the user who created it', async ({ page }) => {
            await expandBlogAndDelete(page, newBlog.title)
            const removedBlog = page.locator(`div[class*="blog"]:has(span:has-text("${newBlog.title}"))`)
            await expect(removedBlog).not.toBeVisible()
        })
    })

    // ex. 5.22
    describe('Ensure that another user cant see Delete button', async () => {
        beforeEach(async ({ page, request }) => {
            await request.post('http://localhost:3001/api/users', {
                data: anotherUser
            })
            await loginWith(page, newUser.username, newUser.password)
            await createBlog(page,newBlog.title, newBlog.author, newBlog.url)
            await page.getByRole('button', {name: 'logout'}).click()
            await loginWith(page, anotherUser.username, anotherUser.password)
        })
        test('check remove button', async ({page}) => {
            await page.locator(`div[class*="blog"]:has(span:has-text("${newBlog.title}")) button:has-text("view")`).click()
            const removeButton = page.locator('button:has-text("Remove")')
            await page.waitForTimeout(1000)
            await expect(removeButton).not.toBeVisible()
        })
    })

    describe('Blogs are arranged in the order according to the likes', async () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, newUser.username, newUser.password)
            await createBlog(page, newBlog.title, newBlog.author, newBlog.url)
            await page.waitForTimeout(1000)
            await createBlog(page, 'Blog2', 'author2', 'url2')
            await page.waitForTimeout(1000)
            await createBlog(page, 'Blog3', 'author3', 'url3')
            await page.waitForTimeout(1000)

            await expandAndLikeBlog(page, 'Blog2', 1)
            await page.waitForTimeout(1000)
            await expandAndLikeBlog(page, 'Blog3', 3)
            await page.waitForTimeout(1000)
            await expandAndLikeBlog(page, newBlog.title, 5)
            await page.waitForTimeout(1000)
        })

        test('blogs are sorted by Likes', async ({ page }) => {
            const blog = page.locator('div[class*="blog"] span')
            await expect(blog.nth(0)).toContainText(newBlog.title)
            await expect(blog.nth(1)).toContainText('Blog3')
            await expect(blog.nth(2)).toContainText('Blog2')
        })
    })
})