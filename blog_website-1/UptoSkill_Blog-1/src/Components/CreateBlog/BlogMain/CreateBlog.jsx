import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateBlog.css";
import JoditEditor from "jodit-react";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [aiTitle, setAiTitle] = useState("");
  const [generateContent, setGenerateContent] = useState("");
  const [aiContent, setAiContent] = useState(false);
  const [blogContent, setBlogContent] = useState([]);
  const [blogImages, setBlogImages] = useState([]);
  // const { GoogleGenerativeAI } = require("@google/generative-ai");
  // const genAI = new GoogleGenerativeAI(
  //   "AIzaSyCJCPJpOvgNFVni-9xHTkxpLxh-ZliDckg"
  // );

  // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  // const pexelsApiKey =
  //   "Tlny80PImvSH01am3Ztxg8qzHndm9jLcE7qRoAcHFod6ofx0cR3n3uEC"; // Replace with your actual Pexels API key

  useEffect(() => {
    async function generate() {
      const jobDescription = aiTitle;
      if (jobDescription) {
        const blogPrompt = `generate a JSON object where key is "blog" and value is a 1000 words single line string about a blog on ${jobDescription} dont create paragraphs just generate a single line string no new lines`;
        const PEXELS_API_KEY =
          "Tlny80PImvSH01am3Ztxg8qzHndm9jLcE7qRoAcHFod6ofx0cR3n3uEC";
        const apiKey = "AIzaSyCJCPJpOvgNFVni-9xHTkxpLxh-ZliDckg";
        const modelName = "gemini-1.5-flash";
        const fetchBlogContent = async (prompt) => {
          try {
            const genAI = new GoogleGenerativeAI(apiKey);
            // Get the specified generative model
            const model = genAI.getGenerativeModel({ model: modelName });

            // Generate content based on the prompt
            const result = await model.generateContent(prompt);
            const response = result.response;
            console.log(response);
            const text = await response.text();

            // Send the generated text back to the client
            console.log(JSON.parse(text));

            setBlogContent(JSON.parse(text));
          } catch (error) {
            console.error("Error fetching blog content:", error);
          }
        };
        const fetchBlogImages = async (jobDescription) => {
          try {
            const response = await axios.get(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(
                jobDescription
              )}&per_page=5`,
              {
                headers: {
                  Authorization: PEXELS_API_KEY,
                },
              }
            );

            if (response.status !== 200) {
              throw new Error("Failed to fetch images from Pexels");
            }

            const data = response.data;
            const imageUrls = data.photos.map((photo) => photo.src.original);
            console.log(imageUrls);
            setBlogImages(imageUrls);
          } catch (error) {
            console.error("Error fetching blog images:", error);
          }
        };
        await fetchBlogContent(blogPrompt);
        await fetchBlogImages(jobDescription);
      }
    }
    generate().catch(console.error);
  }, [aiContent]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (content) => {
    setContent(content);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setContent(content);
    // Handle form submission logic here
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Image:", image);
  };

  const handleGenerateAiPost = (e) => {
    // TO DO: implement AI post generation logic here
    setAiTitle(e);
    setAiContent(false);
  };
  console.log(aiContent);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6">
          <div className="mt-5 p-4 bg-light rounded shadow">
            <div className="title-bar">
              <h5>Write your blog</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={handleTitleChange}
                  style={{ height: "40px", fontSize: "18px" }}
                />
              </div>
              <div className="form-group mb-3 contentt">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <JoditEditor
                  value={content}
                  // onChange={handleContentChange}
                  config={{
                    height: 600,
                    uploader: {
                      insertImageAsBase64URI: true,
                    },
                    toolbar: [
                      "source",
                      "|",
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "|",
                      "superscript",
                      "subscript",
                      "|",
                      "ul",
                      "ol",
                      "|",
                      "outdent",
                      "indent",
                      "|",
                      "font",
                      "fontsize",
                      "|",
                      "text",
                      "color",
                      "|",
                      "align",
                      "|",
                      "image",
                      "|",
                      "link",
                      "unlink",
                      "|",
                      "undo",
                      "redo",
                    ],
                  }}
                  className="large-editor"
                />
              </div>
              {/* <div className="form-group mb-3 ima">
                <label htmlFor="image" className="form-label">Upload Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  onChange={handleImageChange}
                  style={{ height: '40px', fontSize: '18px' }}
                />
              </div> */}
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mt-5 p-4 bg-light rounded shadow">
            <div className="title-bar">
              <h5>AI Generated Post</h5>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="ai-title" className="form-label">
                AI Title
              </label>
              <input
                type="text"
                className="form-control"
                id="ai-title"
                onChange={() => handleGenerateAiPost(event.target.value)}
                value={aiTitle}
                style={{ height: "40px", fontSize: "18px" }}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setAiContent(true)}
            >
              Generate AI Post
            </button>
            <div className="form-group mb-3">
              <label htmlFor="ai-content" className="form-label">
                AI Content
              </label>
              <textarea
                className="form-control"
                id="ai-content"
                value={blogContent.blog}
                readOnly
                style={{ height: "600px", fontSize: "18px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
