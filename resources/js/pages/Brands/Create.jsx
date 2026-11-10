import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: '',
        status: true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('brands.store'));
    }

    return (
        <>
            <Head title="Create Brand" />

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Create Brand
                    </h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Add a new brand to your catalog
                    </p>
                </div>

                {/* Form Card */}
                <div className="max-w-lg rounded-xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Brand Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Nike, Adidas..."
                                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:ring-2 dark:bg-gray-800 dark:text-gray-200 ${
                                    errors.name
                                        ? 'border-red-400 bg-red-50 focus:ring-red-200 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 dark:border-gray-700'
                                }`}
                            />
                            {errors.name && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Image URL
                                <span className="ml-1 font-normal text-gray-400">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={data.image}
                                onChange={(e) => setData('image', e.target.value)}
                                placeholder="https://example.com/logo.png"
                                className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:ring-2 dark:bg-gray-800 dark:text-gray-200 ${
                                    errors.image
                                        ? 'border-red-400 bg-red-50 focus:ring-red-200 dark:border-red-500 dark:bg-red-900/20'
                                        : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 dark:border-gray-700'
                                }`}
                            />
                            {errors.image && (
                                <p className="mt-1.5 text-xs text-red-500">{errors.image}</p>
                            )}

                            {/* Live Image Preview */}
                            {data.image && (
                                <div className="mt-3 flex items-center gap-3">
                                    <img
                                        src={data.image}
                                        alt="Preview"
                                        className="h-16 w-16 rounded-lg border-2 border-gray-200 object-cover dark:border-gray-700"
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                    <p className="text-xs text-gray-400">Image Preview</p>
                                </div>
                            )}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Status
                            </label>
                            <div className="flex gap-3">
                                <label
                                    className={`flex cursor-pointer select-none items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                                        data.status === true
                                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400'
                                            : 'border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        className="hidden"
                                        checked={data.status === true}
                                        onChange={() => setData('status', true)}
                                    />
                                    Active
                                </label>

                                <label
                                    className={`flex cursor-pointer select-none items-center gap-2 rounded-lg border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-150 ${
                                        data.status === false
                                            ? 'border-red-400 bg-red-50 text-red-600 dark:border-red-500 dark:bg-red-900/30 dark:text-red-400'
                                            : 'border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        className="hidden"
                                        checked={data.status === false}
                                        onChange={() => setData('status', false)}
                                    />
                                    Inactive
                                </label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`flex-1 rounded-lg py-3 text-sm font-bold tracking-wide text-white transition-colors duration-200 ${
                                    processing
                                        ? 'cursor-not-allowed bg-indigo-300'
                                        : 'cursor-pointer bg-indigo-600 hover:bg-indigo-700'
                                }`}
                            >
                                {processing ? 'Saving...' : 'Create Brand'}
                            </button>
                            <Link
                                href={route('brands.index')}
                                className="rounded-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-600 transition-colors duration-150 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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

Create.layout = {
    breadcrumbs: [
        { title: 'Brands', href: '/brands' },
        { title: 'Create', href: '/brands/create' },
    ],
};
