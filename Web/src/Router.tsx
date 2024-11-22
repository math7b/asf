import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";
import { LoginLayout } from "./layouts/LogonLayout";
import { PostsProvider } from "./components/PostContext";
import { RegisterLayout } from "./layouts/RegisterLayout";
import { UserProvider } from "./components/UserContext";

export function Router() {
    return (
        <PostsProvider>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/posts/:postId" element={<PostDetails />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                    </Route>
                    <Route path="/login" element={<LoginLayout />} />
                    <Route path="/register" element={<RegisterLayout />} />
                </Routes>
            </UserProvider>
        </PostsProvider>
    );
}