import React, { memo, useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'

import { selectors } from 'state'
import Modal from './modal'
import StroveButton from './stroveButton'
import { persistor } from '../wrapper'

const OldUserModal = () => {
  const dispatch = useDispatch()
  const [isOldUser, setIsOldUser] = useState(false)
  const user = useSelector(selectors.api.getUser)

  const logout = () => {
    persistor.purge()
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT',
    })
    setIsOldUser(false)
  }

  useEffect(() => {
    if (user?.token && !user?.organizations) {
      setIsOldUser(true)
    }

    if (user?.token && user?.organizations && isOldUser) {
      setIsOldUser(false)
    }
    /* eslint-disable-next-line */
  }, [user])

  return (
    <Modal
      isOpen={isOldUser}
      contentLabel="Old user"
      ariaHideApp={false}
      width={isMobile ? '70vw' : '30vw'}
    >
      It seems your account has been created before important update and is
      outdated. Please log in again to update your account.
      <StroveButton
        isPrimary
        padding="5px"
        minWidth="150px"
        maxWidth="150px"
        borderRadius="2px"
        onClick={logout}
        text="Log out"
      />
    </Modal>
  )
}

export default memo(OldUserModal)
