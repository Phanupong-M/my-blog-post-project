function validatePostData(req, res, next) {
    const { title, image, category_id, description, content, status_id } = req.body
 
    if (!title) return res.status(400).json({ message: "Title is required" })
    if (!image) return res.status(400).json({ message: "image is required" })
    if (!category_id) return res.status(400).json({ message: "category_id is required" })
    if (!description) return res.status(400).json({ message: "description is required" })
    if (!content) return res.status(400).json({ message: "content is required" })
    if (!status_id) return res.status(400).json({ message: "status_id is required" })
    

    if (typeof title !== "string") return res.status(400).json({ message: "Title must be a string" })
    if (typeof image !== "string") return res.status(400).json({ message: "image must be a string" })
    if (typeof category_id !== "string") return res.status(400).json({ message: "category_id must be a number" })
    if (typeof description !== "string") returnres.status(400).json({ message: "description must be a string" })
    if (typeof content !== "string") return res.status(400).json({ message: "content must be a string" })
    if (typeof status_id !== "string") return res.status(400).json({ message: "status_id must be a number" })

    next()
}

export default validatePostData