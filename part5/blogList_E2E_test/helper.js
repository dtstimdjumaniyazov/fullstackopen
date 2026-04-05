const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', {name: 'username'}).fill(username)
    await page.getByRole('textbox', {name: 'password'}).fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, title, author, url) => {
    await page.locator('button:has-text("new blog")').click()
    await page.getByRole('textbox', {name: 'title'}).fill(title)
    await page.getByRole('textbox', {name: 'author'}).fill(author)
    await page.getByRole('textbox', {name: 'URL'}).fill(url)
    await page.locator('button:has-text("create")').click()
}


const expandAndLikeBlog = async (page, titleBlog, likeQuantity = 1) => {
    await page.locator(`div[class*="blog"]:has(span:has-text("${titleBlog}")) button:has-text("view")`).click()
    const likeButton = page.locator(`div[class*="blog"]:has(span:has-text("${titleBlog}")) button:has-text("like")`)
    await likeButton.waitFor()
    for (let i = 0; i < likeQuantity; i++) {
        await likeButton.click()
        await page.waitForTimeout(1000)
    }
}


const expandBlogAndDelete = async (page, titleBlog) => {
    await page.locator(`div[class*="blog"]:has(span:has-text("${titleBlog}")) button:has-text("view")`).click()
    page.on('dialog', dialog => dialog.accept())
    await page.locator(`div[class*="blog"]:has(span:has-text("${titleBlog}")) button:has-text("remove")`).click()
}


export { loginWith, createBlog, expandAndLikeBlog, expandBlogAndDelete }