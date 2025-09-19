import router from "./AuthRoutes.js";


router.post("/submit-form", (req, res) => {
    const { name, email, age } = req.body;
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, age });
    res.json({ message: "Form submitted successfully" });
});

export default router;