import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Content from "./pages/Content.tsx";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
    },
    {
        path:"/content/:contentId",
        element:<Content/>,
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
