import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Form',
        component: () => import('@/components/shtab-form.vue'),
    },
    {
        path: '/user/:id',
        name: 'User',
        component: () => import('@/components/shtab-profile.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/components/shtab-notFound.vue'),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;