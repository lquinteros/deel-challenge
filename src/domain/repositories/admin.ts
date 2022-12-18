export interface AdminRepositoryInterface {
    findBestProfession(start: string, end: string): Promise<any> // TODO { profession: 'example name', profit: 1000 }
    findBestClients(start: string, end: string, limit: number): Promise<any> // TODO { 'id': 1, 'fullName': 'Reece Moyer', 'paid' : 100.3 }
}