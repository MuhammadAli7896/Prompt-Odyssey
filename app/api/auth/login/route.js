import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { email, password } = await request.json();

    try {
        await connectToDB();

        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            new Response({
                _id: user._id,
                username: user.username,
                email: user.email,
                image: user.image,
            }, {status: 200});
        } else {
            return new Response("Invalid Email or Password", { status: 401 })
        }
        return true
    } catch (error) {
        return new Response("Failed to auth user", { status: 500 })

    }
}