import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Show({ brand }) {
    function handleDelete() {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('brands.destroy', brand.id));
        }
    }

    return (
        <>
            <Head title={`Brand — ${brand.name}`} />

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🏷️ Brand Details
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            View brand information and details
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={route('brands.edit', brand.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-red-600"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>

                {/* Detail Card */}
                <div className="max-w-lg overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    {/* Brand Image Banner */}
                    {brand.image && (
                        <div className="flex h-40 items-center justify-center border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                            <img
                                src={
                                    brand.image.startsWith('http')
                                        ? brand.image
                                        : `/storage/${brand.image}`
                                }
                                alt={brand.name}
                                className="h-32 w-32 rounded-xl object-contain"
                                onError={(e) => (e.target.style.display = 'none')}
                            />
                        </div>
                    )}

                    {/* Info Rows */}
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                ID
                            </span>
                            <span className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                #{brand.id}
                            </span>
                        </div>

                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                Name
                            </span>
                            <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                {brand.name}
                            </span>
                        </div>

                        <div className="flex items-start px-6 py-4">
                            <span className="mt-0.5 w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                Image
                            </span>
                            {brand.image ? (
                                <a
                                    href={
                                        brand.image.startsWith('http')
                                            ? brand.image
                                            : `/storage/${brand.image}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="break-all text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    {brand.image}
                                </a>
                            ) : (
                                <span className="text-sm italic text-gray-400">No image</span>
                            )}
                        </div>

                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                Status
                            </span>
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                    brand.status
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                        brand.status ? 'bg-green-500' : 'bg-red-500'
                                    }`}
                                />
                                {brand.status ? 'Active' : 'Inactive'}
                            </span>
                        </div>

                        {brand.products && (
                            <div className="flex items-center px-6 py-4">
                                <span className="w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                    Products
                                </span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {brand.products.length} products
                                </span>
                            </div>
                        )}

                        <div className="flex items-center px-6 py-4">
                            <span className="w-32 text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                                Created
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {new Date(brand.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
                        <Link
                            href={route('brands.index')}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400"
                        >
                            &larr; Back to Brands
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
