import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Tela Inicial',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="registro"
                options={{
                    title: 'Registrar veículo',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="[box]/index"
                options={{
                    title: 'Box',
                    href: null
                }}
            />

        </Tabs>
    );
}
