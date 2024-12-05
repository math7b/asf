import { Route, Routes } from "react-router-dom";
import { Bee } from "./pages/Bee";
import { BeeData } from "./pages/BeeData";
import { PostsProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";
import { BeeLayout } from "./layouts/BeeLayout";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { HomeLayout } from "./layouts/HomeLayout";
import { LogonLayout } from "./layouts/LogonLayout";
import { RegisterLayout } from "./layouts/RegisterLayout";
import PostCreate from "./pages/PostCreate";
import PostDetails from "./pages/PostDetails";
import { BeeProvider } from "./context/BeeContext";

export function Router() {
    return (
        <PostsProvider>
            <UserProvider>
                <BeeProvider>
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
                </BeeProvider>
            </UserProvider>
        </PostsProvider>
    );
}