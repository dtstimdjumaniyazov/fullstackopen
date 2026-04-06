const loginWith = async (page, username, password) => {
    await page.getByRole('textbox', {name: 'username'}).fill(username)
    await page.getByRole('textbox', {name: 'password'}).fill(password)
    await page.getByRole('button', {name: 'login', exact: true}).click()
    await page.waitForTimeout(1000)
}

const createBlog = async (page, title, author, url) => {
    await page.waitForSelector('a:has-text("new blog")')
    await page.locator('a:has-text("new blog")').click()
    await page.getByRole('textbox', {name: 'title'}).fill(title)
    await page.getByRole('textbox', {name: 'author'}).fill(author)
    await page.getByRole('textbox', {name: 'URL'}).fill(url)
    await page.locator('button:has-text("create")').click()
}


const expandAndLikeBlog = async (page, titleBlog, likeQuantity = 1) => {
    await page.locator(`div[class*="blog"] a:has-text("${titleBlog}")`).click()
    const likeButton = page.locator('button:has-text("like")')
    await likeButton.waitFor()
    for (let i = 0; i < likeQuantity; i++) {
        await likeButton.click()
        await page.waitForTimeout(500)
    }
    await page.goto('http://localhost:5173/blogs')
}


const expandBlogAndDelete = async (page, titleBlog) => {
    await page.locator(`div[class*="blog"] a:has-text("${titleBlog}")`).click()
    page.on('dialog', dialog => dialog.accept())
    await page.locator('button:has-text("remove")').click()
}


export { loginWith, createBlog, expandAndLikeBlog, expandBlogAndDelete }
