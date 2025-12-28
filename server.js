import dotenv from "dotenv";
import { loadFaceModels } from "./src/utils/face.utils.js";
import app from "./src/app.js";
import "./src/config/db.js"

dotenv.config();

await loadFaceModels();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
