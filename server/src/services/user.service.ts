import User from '../schemas/User.schema';

export const getUsers = async () => {
    return await User.find();
};

export const deleteUser = async (userId: string) => {
    return await User.findByIdAndDelete(userId);
}