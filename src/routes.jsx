import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import AddContact from "./pages/AddContact";
import Edit from "./pages/Edit";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="single/:theId" element={<Single />} />
      <Route path="demo" element={<Demo />} />
      <Route path="add-contact" element={<AddContact />} />
      <Route path="edit/:id" element={<Edit />} />
    </Route>
  )
);