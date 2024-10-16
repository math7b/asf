import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PostCreate from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";
import { LoginLayout } from "./layouts/LogonLayout";
import { AuthProvider } from "./components/ContextProviders/AuthContext";
import { PostsProvider } from "./components/ContextProviders/PostContext";

export function Router() {
    return (
        <AuthProvider>
            <PostsProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/posts/:postId" element={<PostDetails />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                    </Route>
                    <Route path="/login" element={<LoginLayout />} />
                </Routes>
            </PostsProvider>
        </AuthProvider>
    );
}