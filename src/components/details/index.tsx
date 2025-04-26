import NewsLetter from '../newsletter/index';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";


const Details =({content}:any)=>{
    const formSchema = z.object({
        email: z.string().email("Please enter email address"),
    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });
    const onSubmit =()=>{

    }
    return(
        <>
            <div className=" grid grid-cols-1 lg:grid-cols-12  gap-8 lg:gap-16  my-2 lg:my-8">
                <div className="col-span-1 lg:col-span-8 rounded-lg markdown-content">
               <ReactMarkdown>{content}</ReactMarkdown>
            </div>

                <div className="col-span-1 lg:col-span-4 rounded-lg ">
                {/* subscribe newsletter  */}
                    <Card className='bg-gray-100 '>
                        <CardHeader>
                            <CardTitle className='text-xl'>Growth Marketing Tools Newsletter</CardTitle>
                            <CardDescription>
                             Discover the best Growth Marketing Toolstools, news, resources, memes, and jobs — sent to your inbox every Tuesday.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='xs:px-0 xs:w-[90%]  pb-6 sm:px-6 sm:w-full mx-auto'>
                                <iframe src="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no"
                                    className='bg-transparent m-0 rounded-none'
                                ></iframe>
                        </CardContent>
                       
                    </Card>
            </div>
        </div>
      
        </>
    )
}
export default Details