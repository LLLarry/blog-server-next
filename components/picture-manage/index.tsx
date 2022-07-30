import React from "react"
import PictureButton from "./components/picture-button"
import Provider from "./store/Provider"

const PictureManage = () => {

  return <>
    <Provider>
      <PictureButton />
    </Provider>
  </>
}

export default PictureManage