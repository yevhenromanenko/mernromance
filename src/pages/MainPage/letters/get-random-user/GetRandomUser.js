

const GetRandomUser = (users, excludedUserIdsRef, allUsers, excludedUserIds) => {
    console.log(users, 'users')

    const randomUser = users[Math.floor(Math.random() * users.length)];
    console.log(randomUser, 'randomUser randomUser')

    if (excludedUserIdsRef.current.includes(randomUser.id)) {
        console.log(`User ID ${randomUser.id} уже получал письмо сегодня в этой рассылке`);
        return null;
    }

    if (allUsers.length > 0) {
        const userExists = allUsers.some((user) => user.id === randomUser.id);
        if (userExists) {
            console.log('Попытка отправки постояльцу, не отправлено')
            return null;
        }
    }

    const userExists = allUsers.some((user) => user.id === randomUser.id);
    if (userExists) {
        console.log('Попытка отправки постояльцу, не отправлено')
        return null;
    }

    if (excludedUserIds.includes(randomUser.id)) {
        console.log(`User ID ${randomUser.id} уже получал письмо за последние 3 дня!`);
        return null;
    }

    return randomUser;
};

export default GetRandomUser;
