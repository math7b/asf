import { Route, Routes } from "react-router-dom";
import { PostsProvider } from "./components/PostContext";
import { UserProvider } from "./components/UserContext";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { LoginLayout } from "./layouts/LogonLayout";
import { RegisterLayout } from "./layouts/RegisterLayout";
import PostCreate from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";

export function Router() {
    return (
        <PostsProvider>
            <UserProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/posts/:postId" element={<PostDetails />} />
                        <Route path="/posts/create" element={<PostCreate />} />
                    </Route>
                    <Route path="/home" element={<HomeLayout />} />
                    <Route path="/login" element={<LoginLayout />} />
                    <Route path="/register" element={<RegisterLayout />} />
                </Routes>
            </UserProvider>
        </PostsProvider>
    );
}