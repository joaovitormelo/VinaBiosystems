import { UserModel } from "../../../domain/models/userModel";
import { UserData } from "../../../data/authentication/userData";
import { BackendContract, ROUTES } from "../../../data/utils/backendContract";
import { UserDataContract } from "../../../data/authentication/userDataContract";

// Mock do BackendContract
class BackendMock implements BackendContract {
    fetchData = jest.fn();
    putData = jest.fn();
    postData = jest.fn();
    deleteData = jest.fn();
}

describe('UserData', () => {
    let userData: UserData;
    let backend: BackendContract;
    const mockUser = UserModel.getMock();
    const mockUserJson = mockUser.toJson();
    const mockUsers = [mockUserJson, {...mockUserJson, id: 2, email: "test2@test.com"}];

    beforeAll(() => {
        backend = new BackendMock();
        userData = new UserData(backend);
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(backend, 'fetchData')
            .mockImplementation((route: string) => {
                if (route === ROUTES.USER.SELECT_USERS) {
                    return Promise.resolve([...mockUsers]);
                }
                return Promise.resolve(null);
            });
    });

    describe('searchUserByEmail', () => {
        it('deve chamar fetchData com a rota e parâmetros corretos', async () => {
            const email = "test@test.com";
            await userData.searchUserByEmail(email);
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.USER.SELECT_USER_BY_EMAIL, 
                {email}
            );
        });

        it('deve retornar null quando o backend retornar null', async () => {
            jest.spyOn(backend, 'fetchData').mockResolvedValueOnce(null);
            
            const result = await userData.searchUserByEmail("test@test.com");
            expect(result).toBeNull();
        });

        it('deve retornar um UserModel quando o backend retornar dados', async () => {
            jest.spyOn(backend, 'fetchData').mockResolvedValueOnce(mockUserJson);
            
            const result = await userData.searchUserByEmail("test@test.com");
            expect(result).toBeInstanceOf(UserModel);
            expect(result?.toJson()).toEqual(mockUserJson);
        });
    });

    describe('fetchUsers', () => {
        it('deve chamar fetchData com a rota correta', async () => {
            await userData.fetchUsers();
            
            expect(backend.fetchData).toHaveBeenCalledWith(
                ROUTES.USER.SELECT_USERS, 
                null
            );
        });

        it('deve retornar um array de UserModel', async () => {
            const result = await userData.fetchUsers();
            expect(Array.isArray(result)).toBe(true);
            result.forEach(user => {
                expect(user).toBeInstanceOf(UserModel);
            });
            expect(result.map(u => u.toJson())).toEqual(mockUsers);
        });

        it('deve retornar array vazio se o backend retornar array vazio', async () => {
            jest.spyOn(backend, 'fetchData').mockResolvedValueOnce([]);
            
            const result = await userData.fetchUsers();
            expect(result).toEqual([]);
        });
    });

    describe('updateUser', () => {
        it('deve chamar putData com a rota e dados corretos', async () => {
            await userData.updateUser(mockUser);
            
            expect(backend.putData).toHaveBeenCalledWith(
                ROUTES.USER.UPDATE_USER, 
                mockUserJson
            );
        });
    });

    describe('deleteUser', () => {
        it('deve chamar deleteData com a rota e dados corretos', async () => {
            await userData.deleteUser(mockUser);
            
            expect(backend.deleteData).toHaveBeenCalledWith(
                ROUTES.USER.DELETE_USER, 
                mockUserJson
            );
        });
    });

    describe('createUser', () => {
        it('deve chamar postData com a rota e dados corretos', async () => {
            await userData.createUser(mockUser);
            
            expect(backend.postData).toHaveBeenCalledWith(
                ROUTES.USER.INSERT_USER, 
                mockUserJson
            );
        });
    });
});