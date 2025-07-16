export class SharedService {
    id = Math.random();
}

const sharedService = new SharedService();
export {
    sharedService
};

export default sharedService;

