import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ brands }) {
    const { flash } = usePage().props;

    function handleDelete(id) {
        if (confirm('এই Brand টি delete করতে চান?')) {
            router.delete(route('brands.destroy', id));
        }
    }

    return (
        <>
            <Head title="Brands" />

            <div className="p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            🏷️ Brands
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage all your product brands
                        </p>
                    </div>
                    <Link
                        href={route('brands.create')}
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        + New Brand
                    </Link>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 font-medium px-4 py-3 rounded-lg mb-5 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
                        ✅ {flash.success}
                    </div>
                )}

                {/* Table Card */}
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">#</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3.5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {brands.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-gray-400 dark:text-gray-500">
                                        <p className="text-4xl mb-3">📭</p>
                                        <p className="text-base font-medium">কোনো Brand নেই</p>
                                        <p className="text-sm mt-1">নতুন Brand যোগ করুন</p>
                                    </td>
                                </tr>
                            ) : (
                                brands.map((brand, index) => (
                                    <tr
                                        key={brand.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                                    >
                                        <td className="px-6 py-4 text-gray-400 dark:text-gray-500 font-mono text-xs">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                                {brand.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {brand.image ? (
                                                <img
                                                    src={brand.image}
                                                    alt={brand.name}
                                                    className="w-11 h-11 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                                                />
                                            ) : (
                                                <div className="w-11 h-11 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 text-xs">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                brand.status
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${brand.status ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {brand.status ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={route('brands.edit', brand.id)}
                                                    className="inline-flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors duration-150 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 dark:text-blue-400"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(brand.id)}
                                                    className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors duration-150 cursor-pointer border-0 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400"
                                                >
                                                    🗑️ Delete
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
                        <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
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
