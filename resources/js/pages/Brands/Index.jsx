import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Index({ brands }) {
    const { flash } = usePage().props;

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('brands.destroy', id));
        }
    }

    return (
        <>
            <Head title="Brands" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Brands
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Manage all your product brands
                        </p>
                    </div>
                    <Link
                        href={route('brands.create')}
                        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-indigo-700"
                    >
                        + Add Brand
                    </Link>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="mb-5 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 font-medium text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {flash.success}
                    </div>
                )}

                {/* Table Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <th className="w-12 px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    ID
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Brand Name
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Image
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Status
                                </th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {brands.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-16 text-center text-gray-400 dark:text-gray-500"
                                    >
                                        <p className="text-base font-medium">No brands found</p>
                                        <p className="mt-1 text-sm">
                                            Create a new brand to get started
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                                brands.map((brand) => (
                                    <tr
                                        key={brand.id}
                                        className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                                    >
                                        <td className="px-6 py-4 font-mono text-xs text-gray-400 dark:text-gray-500">
                                            #{brand.id}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800 dark:text-gray-200">
                                            <Link
                                                href={route('brands.show', brand.id)}
                                                className="hover:text-indigo-600 hover:underline dark:hover:text-indigo-400"
                                            >
                                                {brand.name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            {brand.image ? (
                                                <img
                                                    src={
                                                        brand.image.startsWith('http')
                                                            ? brand.image
                                                            : `/storage/${brand.image}`
                                                    }
                                                    alt={brand.name}
                                                    className="h-11 w-11 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                                                />
                                            ) : (
                                                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xs text-gray-400 dark:border-gray-700 dark:bg-gray-800">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
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
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('brands.show', brand.id)}
                                                    className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors duration-150 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('brands.edit', brand.id)}
                                                    className="inline-flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors duration-150 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(brand.id)}
                                                    className="inline-flex cursor-pointer items-center rounded-lg border-0 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors duration-150 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Footer */}
                    {brands.length > 0 && (
                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-800/50">
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Total <span className="font-semibold text-gray-600 dark:text-gray-300">{brands.length}</span> brands found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        { title: 'Brands', href: '/brands' },
    ],
};
