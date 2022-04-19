// 防抖
export function debounce(fn: Function, delay: number) {
    let timer: any = null
    return function () {
        if (timer) {
            clearTimeout(timer) 
        }
        timer = setTimeout(fn,delay) 
    }
}

// 节流
export function throttle(fn: Function, delay: number){
    let valid = true
    return function() {
       if(!valid){
           return false 
       }
        valid = false
        setTimeout(() => {
            fn()
            valid = true;
        }, delay)
    }
}