import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { stateSelector, wrapper } from '../store'


const List: NextPage<{ data: any }> = ({ data }) => {
  const state = useSelector(stateSelector)
  console.log(state, data)
  return <div>
    <h1>List</h1>
    {/* <h3>TICK: {state.tick}</h3> */}
    <h3>data: {data.a}</h3>
  </div>
}

export default List

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
//   // const data = await res.json()
//   const data = {a: 1}
//   // Pass data to the page via props
//   return { props: { data } }
// }

//@ts-ignore
export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}) => {
  console.log('2. Page.getServerSideProps uses the store to dispatch things');
  store.dispatch({type: 'TICK', payload: 'was set in other page'});
  const data = {a: 1}
  return { props: { data } }
});