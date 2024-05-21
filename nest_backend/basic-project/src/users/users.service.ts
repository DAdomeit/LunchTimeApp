import { HttpException, Injectable } from '@nestjs/common';
import { USERS } from 'mocks/users.mock';

@Injectable()
export class UsersService {
    users = USERS;

    getAllUsers(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.users);
        });
    }

    getUser(userId): Promise<any> {
        return new Promise(resolve => {
            const user = this.users.find(x => x.id === userId);
            if (!user) {
                throw new HttpException('User with Id: ' + userId + ' was not found.', 404)
            }
            resolve(user);
        });
    }

    addUser(user): Promise<any> {
        return new Promise(resolve => {
            this.users.push(user);
            resolve(this.users);
        });
    }

    updateUser(user): Promise<any> {
        return new Promise(resolve => {
            const i = this.users.findIndex(x => x.id === user.id);
            if (i === -1) {
                throw new HttpException('User with Id: ' + user.id + ' was not found.', 404)
            }
            this.users[i] = user;
            resolve(this.users);
        }) 
    }

    deleteUser(userId): Promise<any> {
        return new Promise(resolve => {
            let i = this.users.findIndex(x => x.id === userId);
            if (i === -1) {
                throw new HttpException('User with Id: ' + userId + ' was not found.', 404)
            }
            this.users.splice(i ,1);
            resolve(this.users);
        });
    }
}
