import type { Meta, StoryObj } from '@storybook/html';
import type { IInputs, IOutputs } from '../jsonViewerControl/generated/ManifestTypes';

import { useArgs, useEffect } from '@storybook/preview-api';
import { jsonViewerControl as Component } from '../jsonViewerControl/';
import { ComponentFrameworkMockGenerator, StringPropertyMock } from '@shko.online/componentframework-mock';

import "../jsonViewerControl/css/main.css";

import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons(/* optional base url */);

export default {
    title: "Json Viewer Control",
    argTypes: {
        jsonValue: {
            name: 'JSON Value',
            control: 'text',
            table: {
                category: 'Parameters',
            },
        },
    }
} as Meta<StoryArgs>;

interface StoryArgs {
    isDisabled: boolean;
    isVisible: boolean;
    jsonValue: string;
}

const renderGenerator = () => {
    let container: HTMLDivElement | undefined;
    let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

    return function () {
        useEffect(()=>()=>{
            container = undefined;
            mockGenerator?.control.destroy();
        });
        const [args, ] = useArgs<StoryArgs>();
        if (!container) {
            container = document.createElement('div');
            mockGenerator = new ComponentFrameworkMockGenerator(
                Component,
                {
                    jsonValue: StringPropertyMock
                },
                container,
            );

            mockGenerator.context.mode.isControlDisabled = args.isDisabled;
            mockGenerator.context.mode.isVisible = args.isVisible;
            mockGenerator.context._SetCanvasItems({
                jsonValue: args.jsonValue
            });

            mockGenerator.ExecuteInit();
        }

        if (mockGenerator) {
            mockGenerator.context.mode.isVisible = args.isVisible;
            mockGenerator.context.mode.isControlDisabled = args.isDisabled;
            mockGenerator.context._parameters.jsonValue._SetValue(args.jsonValue);

            mockGenerator.ExecuteUpdateView();
        }

        return container;
    };
};

export const JsonViewerControl = {
    render: renderGenerator(),
    args: {       
        jsonValue: "{\"say\":\"Hi There :)\"}",
    },
} as StoryObj<StoryArgs>;
