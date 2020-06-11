function makeFoldersArray() {
    return [
        {
            id: 1,
            folder: 'test-folder-1'
        },
        {
            id: 2,
            folder: 'test-folder-2'
        },
        {
            id: 3,
            folder: 'test-folder-3'
        }
    ];
}

function makeMaliciousFolder() {
    const maliciousFolder = {
        id: 000,
        folder: 'bad stuff',
    }
    const expectedFolder = {
        ...maliciousFolder,
        folder: 'kinda bad stuff',
    }
    return {
        maliciousFolder,
        expectedFolder
    }
}

module.exports = {
    makeFoldersArray, makeMaliciousFolder
}