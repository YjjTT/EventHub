class EventHub {
    private cache: { [key: string]: Array<(data: unknown) => void> } = {} // 存储 {'xx报纸': [fn1, fn2, ...], 'xxx报纸': [fn1, fn2, fn3, ...]} 存储事件名和事件回调
    on(eventName: string, fn: (data: unknown) => void) {
        // 把fn推进this.cache[eventname]数组
        // if (this.cache[eventName] === undefined) {
        //     this.cache[eventName] = []
        // }
        this.cache[eventName] = this.cache[eventName] || []
        // const array = this.cache[eventName]
        // array.push(fn)
        this.cache[eventName].push(fn)
    }
    emit(eventName: string, data?: unknown) {
        // 把this.cache[eventName]数组里面的fn全部依次调用
        // let array = this.cache[eventName]
        // if (array === undefined) {
        //     array = []
        // }
        // let array = this.cache[eventName] || []
        // array.forEach((fn) => {
        //     fn()
        // })
        if (this.cache[eventName] === undefined) return
        this.cache[eventName].forEach((fn) => fn(data))
    }
    off(eventName: string, fn: (data: unknown) => void) {
        // 把fn从this.cache[eventname]删除
        // this.cache[eventName] = this.cache[eventName] || []
        // let index = undefined
        // for (let i = 0; i < this.cache[eventName].length; i++) {
        //     if (this.cache[eventName][i] === fn) {
        //         index = i
        //         break
        //     }
        // }
        let index = indexOf(this.cache[eventName], fn)
        if (index === -1) return
        this.cache[eventName].splice(index, 1)
    }
}
// eventHub 发布订阅模式 emit on
// 用于多个对象进行通信, 替代全局变量
export default EventHub

/**
 *
 * @param array 帮组函数 helper indexOf
 * @param item
 */
function indexOf(array, item) {
    if (array === undefined) return -1 // off就不需要初始化了 this.cache[eventName] = this.cache[eventName] || []
    let index = -1
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            index = i
            break
        }
    }
    return index
}
