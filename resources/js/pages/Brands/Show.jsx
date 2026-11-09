import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Show({ brand }) {
    function handleDelete() {
        if (confirm('এই Brand টি delete করতে চান?')) {
            router.delete(route('brands.destroy', brand.id));
        }
    }

    return (
        <>
            <Head title={`Brand — ${brand.name}`} />

            <div className="p-6">

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🏷️ Brand Details
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Brand এর বিস্তারিত তথ্য
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('brands.edit', brand.id)}
                            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200"
                        >
                            ✏️ Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200 border-0 cursor-pointer"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>

                {/* Detail Card */}
                <div className="max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

                    {/* Brand Image Banner */}
                    {brand.image && (
                        <div className="h-40 bg-gray-50 dark:bg-gray-800 flex items-center justify-center border-b border-gray-100 dark:border-gray-800">
                            <img
                                src={brand.image}
                                alt={brand.name}
                                className="h-32 w-32 object-contain rounded-xl"
                                onError={e => e.target.style.display = 'none'}
                            />
                        </div>
                    )}

                    {/* Info Rows */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">

                        {/* ID */}
                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">ID</span>
                            <span className="text-sm font-mono text-gray-600 dark:text-gray-400">#{brand.id}</span>
                        </div>

                        {/* Name */}
                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Name</span>
                            <span className="text-base font-semibold text-gray-800 dark:text-gray-200">{brand.name}</span>
                        </div>

                        {/* Image URL */}
                        <div className="flex items-start px-6 py-4">
                            <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide mt-0.5">Image</span>
                            {brand.image ? (
                                <a
                                    href={brand.image}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400 break-all"
                                >
                                    {brand.image}
                                </a>
                            ) : (
                                <span className="text-sm text-gray-400 italic">No image</span>
                            )}
                        </div>

                        {/* Status */}
                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Status</span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                                brand.status
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${brand.status ? 'bg-green-500' : 'bg-red-500'}`} />
                                {brand.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        {/* Products count */}
                        {brand.products && (
                            <div className="flex items-center px-6 py-4">
                                <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Products</span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {brand.products.length} টি product
                                </span>
                            </div>
                        )}

                        {/* Created At */}
                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">Created</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(brand.created_at).toLocaleDateString('bn-BD', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
                        <Link
                            href={route('brands.index')}
                            className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 font-semibold"
                        >
                            ← সব Brand দেখুন
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

Show.layout = {
    breadcrumbs: [
        { title: 'Brands', href: '/brands' },
        { title: 'Details', href: '#' },
    ],
};

