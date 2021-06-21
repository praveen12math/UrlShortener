const express = require("express")
const mongoose = require("mongoose")
const app = express()
const ShortUrl = require("./modal/ShortUrl")

mongoose.connect('mongodb+srv://adminpratap:Adminpratap@cluster0.cwkgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set("view engine", "ejs")

app.use(express.urlencoded({extended: false}))


app.get("/", async (req, res) => {

    const allUrls = await ShortUrl.find()

    res.render("index", {allUrls})
})


app.get("/:shortUrl", async (req, res) => {
    const shortUrl = await ShortUrl.findOne({shortUrl: req.params.shortUrl})

    if(shortUrl === null){
        return res.status(400).json({
            error: "Not found"
        })
    }

    res.redirect(shortUrl.fullUrl)
})

app.get("/remove/:id", async(req, res) => {
    const shortUrl = await ShortUrl.findByIdAndRemove(req.params.id)

    if(shortUrl === null){
        return res.status(400).json({
            error: "Not found"
        })
    }

    res.redirect("/")

})

app.post('/shorturl', async (req, res) => {
    await ShortUrl.create({fullUrl: req.body.fullUrls})
    res.redirect('/')
})

app.listen(process.env.PORT || 8000)