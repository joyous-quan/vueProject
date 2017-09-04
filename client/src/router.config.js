import user from "./components/user.vue";
import home from "./components/home.vue";
import news from "./components/news.vue";
import upload from "./components/upload.vue";
import cate from "./components/layout/cate.vue";
import comment from "./components/comment.vue";
export const routes = [
	{path:"/",component:home},
	{path:"/user",component:user},
	{path:"/news",component:news},
	{path:"/upload",component:upload},
	{path:"/cate",component:cate},
	{path:"/comment",component:comment}
];