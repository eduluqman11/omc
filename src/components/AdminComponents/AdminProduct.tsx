"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MultiSelect } from "react-multi-select-component";


const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]
const AdminProduct = () => {

    const [category, setCategory] = useState(['Beauty', 'Furniture', 'Electronic'])

    const productSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        category: Yup.string().required("Category is required"),
        price: Yup.number().required("Price is required").positive(),
        discount: Yup.number().min(0),
        rating: Yup.number().min(0).max(5),
        brand: Yup.string().required("Brand is required"),
        description: Yup.string().required("description is required"),
        tags: Yup.string(),
        width: Yup.number(),
        height: Yup.number(),
        depth: Yup.number(),
        warranty: Yup.string(),
        shippingInfo: Yup.string(),
        colors: Yup.array().of(Yup.string().matches(/^#([0-9a-fA-F]{6})$/, "Invalid hex color")),
        files: Yup.mixed()
            .required("Images are required")
            .test("fileCount", "Please upload at least one image", (value) => {
                return value && value.length > 0;
            }),
    });

    const initialValues = {
        title: "",
        category: "",
        price: 0,
        discount: 0,
        rating: 0,
        brand: "",
        description: "",
        tags: "",
        width: 0,
        height: 0,
        depth: 0,
        warranty: "",
        shippingInfo: "",
        colors: [],
        files: null,
        selectedColor: "#000000", // temporary color picker value

    };

    return (
        <div>
            <div className="flex flex-row-reverse my-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size={"sm"}>Add Product</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Add Product</DialogTitle>
                            <DialogDescription>Fill in the product details below.</DialogDescription>
                        </DialogHeader>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={productSchema}
                            onSubmit={(values) => {
                                console.log("Form values:", values);
                            }}
                        >
                            {({ handleChange, values, setFieldValue }) => (
                                <Form className="space-y-4">
                                    {/* Basic Details */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Title</Label>
                                            <Field name="title" as={Input} placeholder="Matrix Chair" />
                                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <Label>Category</Label>
                                            <Select
                                                value={values.category} // Controlled by Formik
                                                onValueChange={(value) => {
                                                    setFieldValue("category", value); // This updates Formik state
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {category.map((item, index) => (
                                                            <SelectItem key={index} value={item}>
                                                                {item}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <Label>Price</Label>
                                            <Field name="price" type="number" as={Input} />
                                            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div>
                                            <Label>Discount (%)</Label>
                                            <Field name="discount" type="number" as={Input} />

                                        </div>
                                        <div>
                                            <Label>Rating</Label>
                                            <Field name="rating" type="number" as={Input} />
                                        </div>
                                        <div>
                                            <Label>Brand</Label>
                                            <Field name="brand" as={Input} placeholder="Nilkamal" />
                                            <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label>Description</Label>
                                        <Field name="description" as={Input} placeholder="Description" />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <Label>Tags</Label>
                                        <Field name="tags" as={Input} placeholder="beauty, mascara" />
                                    </div>

                                    {/* Dimensions */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label>Width</Label>
                                            <Field name="width" type="number" as={Input} />
                                        </div>
                                        <div>
                                            <Label>Height</Label>
                                            <Field name="height" type="number" as={Input} />
                                        </div>
                                        <div>
                                            <Label>Depth</Label>
                                            <Field name="depth" type="number" as={Input} />
                                        </div>
                                    </div>

                                    {/* Warranty, Shipping */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Warranty</Label>
                                            <Field name="warranty" as={Input} placeholder="1 week warranty" />
                                        </div>
                                        <div>
                                            <Label>Shipping Info</Label>
                                            <Field name="shippingInfo" placeholder="Ships in 3-5 business days" as={Input} />
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label>Colors</Label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={values.selectedColor || "#000000"}
                                                    onChange={(e) => setFieldValue("selectedColor", e.target.value)}
                                                />
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    onClick={() => {
                                                        if (
                                                            values.selectedColor &&
                                                            !values.colors.includes(values.selectedColor)
                                                        ) {
                                                            setFieldValue("colors", [...values.colors, values.selectedColor]);
                                                        }
                                                    }}
                                                >
                                                    Add Color
                                                </Button>
                                            </div>
                                            <div className="flex gap-2 mt-2 flex-wrap">
                                                {values.colors.map((color, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-6 h-6 rounded-full border border-gray-300"
                                                        style={{ backgroundColor: color }}
                                                        title={color}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Images</Label>
                                            <input
                                                id="files"
                                                name="files"
                                                type="file"
                                                accept=".png,.gif,.jpeg,.jpg"
                                                multiple
                                                onChange={(event) => {
                                                    setFieldValue("files", event.currentTarget.files);
                                                }}
                                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                            />
                                            <ErrorMessage name="files" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>


                                    <DialogFooter className="mt-6">
                                        <Button type="submit">Save Product</Button>
                                    </DialogFooter>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="p-2">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead >Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead >Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell>{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell >{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    {/* <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell className="text-right">$2,500.00</TableCell>
                        </TableRow>
                    </TableFooter> */}
                </Table>
            </div>
        </div>
    )
}

export default AdminProduct;