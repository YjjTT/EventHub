import EventHub from '../src/index'

// 测试 不是没有错就没有bug 是能测试初bug 才能证明测试有用
// 如果代码有两句重复 就可优化
// 测试驱动开发 TDD  可以自己手写 assert库 也可以使用chai + sinon

type TestCase = (message: string) => void

const test1: TestCase = (messase) => {
    const eventHub = new EventHub()
    console.assert(eventHub instanceof Object === true, 'eventHub 是个对象')
    console.log(messase)
}

const test2: TestCase = (messase) => {
    const eventHub = new EventHub()
    // on emit
    let called = false
    eventHub.on('xxx', (data) => {
        called = true
        console.assert(data === '今天周四了')
    })
    eventHub.emit('xxx', '今天周四了')
    setTimeout(() => {
        console.assert(called === true)
        console.log(messase)
    }, 1000)
}

const test3: TestCase = (messase) => {
    const eventHub = new EventHub()
    let called = false
    const fn1 = () => {
        called = false
    }
    eventHub.on('yyy', fn1)
    eventHub.off('yyy', fn1)
    eventHub.emit('yyy')

    setTimeout(() => {
        console.assert(called === false)
        console.log(messase)
    }, 1000)
}

test1('eventHub 可以创建对象')
test2('.on 了之后 .emit 会触发 .on 的函数')
test3('.off 有用')
