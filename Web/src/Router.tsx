import { Route, Routes } from "react-router-dom";
import { Bee } from "./components/Bee";
import { BeeData } from "./components/BeeData";
import { PostsProvider } from "./components/PostContext";
import { UserProvider } from "./components/UserContext";
import { BeeLayout } from "./layouts/BeeLayout";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { LogonLayout } from "./layouts/LogonLayout";
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
                    <Route path="/login" element={<LogonLayout />} />
                    <Route path="/register" element={<RegisterLayout />} />
                    <Route path="/bee" element={<BeeLayout />} >
                        <Route path="/bee/" element={<Bee />} />
                        <Route path="/bee/:beeId" element={<BeeData />} />
                    </Route>
                </Routes>
            </UserProvider>
        </PostsProvider>
    );
}