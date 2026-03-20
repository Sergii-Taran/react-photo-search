📸 React Photo Search App

A modern React application for searching and viewing high-quality photos using the Pexels API.

🚀 Live Demo

https://react-photo-search-six.vercel.app/

✨ Features

🔍 Search photos by keyword
🖼 Responsive photo gallery
🔎 Modal with full-size image preview
⏳ Loading indicator (spinner)
❌ Error handling
🔢 Pagination with smooth scrolling
⚡ Fast API requests with Axios
🎯 Clean and scalable architecture

🛠 Tech Stack

React + TypeScript
Vite
Axios
React Paginate
React Spinners
CSS Modules

📂 Project Structure
src/
├── components/
│ ├── App/
│ ├── Form/
│ ├── PhotosGallery/
│ ├── PhotosGalleryItem/
│ ├── Modal/
│ ├── Loader/
│ ├── Pagination/
│ └── ui/
│ ├── Container/
│ ├── Grid/
│ ├── GridItem/
│ ├── Section/
│ └── Text/
│
├── services/
│ └── photos.ts
│
├── types/
│ └── photo.ts

⚙️ Getting Started

1. Clone the repository
   git clone https://github.com/your-username/react-photo-search.git
   cd react-photo-search
2. Install dependencies
   npm install
3. Setup environment variables

Create a .env file in the root directory:
VITE_PEXELS_API_KEY=your_api_key_here
⚠️ Never commit your API key to GitHub

4. Run the project
   npm run dev

🧠 Key Implementation Details

Form handling uses modern React Form Actions API (action instead of onSubmit)
Pagination is fully controlled using forcePage
Modal is implemented via createPortal with:
ESC key closing
backdrop click handling
body scroll lock

API layer is separated into a service (photos.ts)
State management handled via React hooks

🎯 UX Improvements

Smooth scroll to top on page change
Disabled pagination during loading
Input validation (empty query prevention)
Auto-reset search input after submit

📸 API

This project uses the Pexels API for fetching images.

📦 Future Improvements

🔄 Infinite scroll
⚡ Debounced search
🌐 URL query sync
🖼 Skeleton loaders
❤️ Favorites system

👨‍💻 Author

Serhii Taran

Frontend Developer (React / FullStack in progress)

⭐️ Show your support

Give a ⭐️ if you like this project!
