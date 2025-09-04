import { Schema, model, models } from "mongoose";

const SubscriberSchema = new Schema(
    {    
    email: {
        type: String,
        required: true,
        unique: true
    } 
    },
    {
        timestamps: true
    }
)

// Prevent model overwrite on hot reloads
const Subscriber = models.Subscriber || model('Subscriber', SubscriberSchema);

export default Subscriber