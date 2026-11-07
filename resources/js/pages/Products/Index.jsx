import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ products }) {
    const { flash } = usePage();

    return (
        <>
            <Head title="Products" />
            <h1 className="title">All Products</h1>

            {/* আপনার আগের তৈরি করা সুন্দর টেবিলটি এখানে বসান */}
            <div className="w-full bg-white shadow-md rounded-xl border border-slate-200 overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left">Title</th>
                            <th className="px-6 py-4 text-left">Category</th>
                            <th className="px-6 py-4 text-left">Brand</th>
                            <th className="px-6 py-4 text-left">Price/Size</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {products.data.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4">{product.title}</td>
                                {/* Eager Loading এর কারণে নিচের ডাটাগুলো সরাসরি পাচ্ছেন */}
                                <td className="px-6 py-4">{product.category?.name}</td>
                                <td className="px-6 py-4">{product.brand?.name}</td>
                                <td className="px-6 py-4">
                                    {product.size ? product.size.join(', ') : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}