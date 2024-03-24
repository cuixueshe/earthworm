import courseLinks from "~/assets/courseLinks.json";

// 星荣课程列表
// 由于改版，现在无法获取到课程列表
// 需要手动在浏览器调用接口获取数据
// 返回的数据结构是:
// {
//     code: 0,
//     message: "0",
//     data: {
//         aids: [...],
//         archives: [...],
//         meta: {...},
//         page: {...}
//     }
// }
// 我们需要获取的是 data.archives
// 把其放到 assets/courseLinks.json 中
// const url = 'https://api.bilibili.com/x/polymer/web-space/seasons_archives_list?mid=160507280&season_id=48449&page_num=1&page_size=99'

export function getCourseLink(index: number) {
  // 这里要处理下边界，否则可能出现没有 link 后报错导致页面白屏
  return courseLinks[index]?.link;
}
