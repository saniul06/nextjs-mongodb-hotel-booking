import Room from '../models/room';

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
        // console.log('this.query: ', this.query)
    }

    search() {
        const location = this.queryStr?.location ?
            {
                address: {
                    $regex: this.queryStr.location,
                    $options: 'i'
                }
            }
            : {};
        this.query = this.query.find({ ...location });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removedFields = ['location', 'page'];
        removedFields.forEach(item => delete queryCopy[item])
        this.query = this.query.find({ ...queryCopy });
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);
        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

export default ApiFeatures;