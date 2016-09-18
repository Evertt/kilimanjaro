import {create} from '../src/opt'

var a = create({test: 123})
  .action("test", s => () => s.dispatch)
  .action("test1", s => (k: string) => {})
  // .action("test2", s => (k: string, h: number) => s.dispatch)
  .mutation('addNewProduct', s => () => s.test += 1)

var b = create({myString: '333'})
.mutation('increment', s => () => s.myString += 1)
.mutation('decrement', s => (k?: number) => s.myString += 1)
.mutation('nothing', s => (k: number) => s.myString += 1)
.mutation('default', s => (k = 123) => s.myString += k)
// .mutation('decrement', s => (k: number, h: string) => s.myString += 1)


var c = create()
  .module("a", a)
  .module("b", b)
  .getter('mytest', s => {
    return s.$('b')
  })
  .action('INCREMENT', s => (a?: string) => {
  })


var commit = c.done().commit
var dispatch = c.done().dispatch

var decrement = commit('decrement')
var increment = commit('increment')
var nothing = commit('nothing')
var dft = commit('default')

var disp1 = dispatch('INCREMENT')
var disp2 = dispatch('test')
var disp3 = dispatch('test1')

//should compile
decrement(undefined, {silent: true})
decrement(123)
dft()
dft(222)
increment()
nothing(123)
disp1('1231')
disp2()
disp3('1123')


// should not compile
increment(123)
// decrement('123')
// nothing()
// nothing('123')
// nothing({silent: true})
// disp3()
