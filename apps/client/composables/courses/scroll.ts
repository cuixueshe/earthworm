export function useCourseScrollIntoView(){
 
  function scrollIntoView(el: HTMLElement) {
    el && el.scrollIntoView()
  }

  return {
    scrollIntoView
  }
}
