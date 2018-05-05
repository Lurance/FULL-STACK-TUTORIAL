class Laf {
    constructor() {
        this.lafs = [
           {
                username: "aaa",
                item: "Phone",
            },
            {
                username: "bbb",
                item: "Book",
            }
        ]
    }

    getLafs() {
        return this.lafs
    }

    createLaf(username, item) {
        this.lafs.push({
            username: username,
            item: item
        })
    }
}

module.exports = Laf