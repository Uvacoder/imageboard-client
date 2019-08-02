import request from 'superagent'

export const ALL_IMAGES = 'ALL_IMAGES'

const baseUrl = 'http://localhost:4000'

function allImages (payload) {
  return {
    type: ALL_IMAGES,
    payload
  }
}

export const getImages = () => (dispatch, getState) => {
  const state = getState()
  const { images } = state

  if (!images.length) {
    request(`${baseUrl}/image`)
      .then(response => {
        const action = allImages(response.body)

        dispatch(action)
      })
      .catch(console.error)
  }
}

export const NEW_IMAGE = 'NEW_IMAGE'

function newImage (payload) {
  return {
    type: NEW_IMAGE,
    payload
  }
}

export const createImage = data => (dispatch, getState) => {

  const state = getState()
  const { user } = state

  request
    .post(`${baseUrl}/image`)
    .set('Authorization', `Bearer ${user}`)
    .send(data)
    .then(response => {
      const action = newImage(response.body)

      dispatch(action)
    })
    .catch(console.error)
}

export const JWT = "JWT"

function newLogin (payload) {
  return {
    type: JWT,
    payload
  }
}

export const login = (email, password) => dispatch => {
  const payload = {email, password}
  request
    .post(`${baseUrl}/logins`)
    .send(payload)
    .then(response => {
      const action = newLogin(response.body.jwt)
      dispatch(action)
    })
    .catch(console.error)
}