import { User, UserContext } from 'context/UserContext';

import React from 'react';

const useUser = (): UserContext => React.useContext(User);

export default useUser;
