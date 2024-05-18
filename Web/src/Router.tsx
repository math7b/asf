import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
                <Route path="/posts/create" element={<PostCreate />} />
            </Route>
        </Routes>
    );
}