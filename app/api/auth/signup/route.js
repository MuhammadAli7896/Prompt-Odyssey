import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { email, name, password } = await request.json();

    try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

            let user = new User({
                email,
                password,
                username: name,
            });

            user = await user.save();
            if (user) {
                return new Response({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    image: user.image,
                }, {status: 201});
            } else {
                throw new Response("User not registered successfully", { status: 500 });
            }
        }
        else {
            return new Response("User already exists", { status: 400 });
        }

        return true
    } catch (error) {
        console.log(error)
        return new Response("Failed to create user", { status: 500 })

    }
}