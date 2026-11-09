import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ brand }) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name || '',
        image: brand.image || '',
        status: brand.status ?? true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('brands.update', brand.id));
    }

    return (
        <>
            <Head title={`Edit — ${brand.name}`} />

            <div className="p-6">

                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ✏️ Edit Brand
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Editing: <span className="font-semibold text-gray-700 dark:text-gray-300">{brand.name}</span>
                    </p>
                </div>

                {/* Form Card */}
                <div className="max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                Brand Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="e.g. Nike, Adidas..."
                                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 dark:text-gray-200 dark:bg-gray-800 outline-none focus:ring-2 transition ${
                                    errors.name
                                        ? 'border-red-400 bg-red-50 focus:ring-red-200 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-300 focus:border-indigo-400'
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                                Image URL
                                <span className="text-gray-400 font-normal ml-1">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={data.image}
                                onChange={e => setData('image', e.target.value)}
                                placeholder="https://example.com/logo.png"
                                className={`w-full px-4 py-2.5 rounded-lg border text-sm text-gray-800 dark:text-gray-200 dark:bg-gray-800 outline-none focus:ring-2 transition ${
                                    errors.image
                                        ? 'border-red-400 bg-red-50 focus:ring-red-200 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-200 dark:border-gray-700 focus:ring-indigo-300 focus:border-indigo-400'
                                }`}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-xs mt-1.5">{errors.image}</p>
                            )}

                            {/* Live Image Preview */}
                            {data.image && (
                                <div className="mt-3 flex items-center gap-3">
                                    <img
                                        src={data.image}
                                        alt="Preview"
                                        className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                                        onError={e => e.target.style.display = 'none'}
                                    />
                                    <p className="text-xs text-gray-400">Image Preview</p>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Status
                            </label>
                            <div className="flex gap-3">
                                <label className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all duration-150 select-none ${
                                    data.status === true
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-500'
                                        : 'border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                    <input
                                        type="radio"
                                        name="status"
                                        className="hidden"
                                        checked={data.status === true}
                                        onChange={() => setData('status', true)}
                                    />
                                    ✅ Active
                                </label>

                                <label className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 cursor-pointer font-semibold text-sm transition-all duration-150 select-none ${
                                    data.status === false
                                        ? 'border-red-400 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 dark:border-red-500'
                                        : 'border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                    <input
                                        type="radio"
                                        name="status"
                                        className="hidden"
                                        checked={data.status === false}
                                        onChange={() => setData('status', false)}
                                    />
                                    ❌ Inactive
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`flex-1 py-3 rounded-lg font-bold text-white text-sm tracking-wide transition-colors duration-200 ${
                                    processing
                                        ? 'bg-indigo-300 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                                }`}
                            >
                                {processing ? '⏳ Saving...' : '💾 Update Brand'}
                            </button>
                            <Link
                                href={route('brands.index')}
                                className="px-5 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 font-semibold text-sm transition-colors duration-150"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Brands', href: '/brands' },
        { title: 'Edit', href: '#' },
    ],
};
