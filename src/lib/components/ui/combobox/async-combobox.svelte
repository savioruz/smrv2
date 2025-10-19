<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick, onDestroy } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';

	type Option = {
		label: string;
		value: string;
	};

	const props = $props<{
		fetchOptions: (query: string) => Promise<Option[]>;
		placeholder?: string;
		searchPlaceholder?: string;
		emptyText?: string;
		loadingText?: string;
		buttonClass?: string;
		onSelect?: (value: string) => void;
		required?: boolean;
		showError?: boolean;
		debounceMs?: number;
	}>();

	const {
		fetchOptions,
		placeholder = 'Select option...',
		searchPlaceholder = 'Search...',
		emptyText = 'No option found.',
		loadingText = 'Loading...',
		buttonClass = '',
		onSelect,
		required = false,
		showError = false,
		debounceMs = 300
	} = props;

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement | null>(null);
	let selectedOption = $state('');
	let selectedLabel = $state('');
	let options = $state<Option[]>([]);
	let isLoading = $state(false);
	let searchTerm = $state('');
	let searchTimeout: number | null = null;

	const selectedValue = $derived(selectedLabel || options.find((f: Option) => f.value === selectedOption)?.label);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}

	function handleSelect(value: string) {
		const option = options.find((o) => o.value === value);
		selectedOption = value;
		selectedLabel = option?.label || '';
		onSelect?.(value);
		closeAndFocusTrigger();
	}

	async function loadOptions(query: string) {
		isLoading = true;
		try {
			const result = await fetchOptions(query);
			options = result;
		} catch (error) {
			console.error('Error loading options:', error);
			options = [];
		} finally {
			isLoading = false;
		}
	}

	// Debounced search function
	function handleSearch(term: string) {
		searchTerm = term;

		// Clear previous timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Debounce search
		searchTimeout = setTimeout(() => {
			loadOptions(term);
		}, debounceMs);
	}

	// Handle popover open/close
	function handleOpenChange(isOpen: boolean) {
		open = isOpen;
		if (isOpen) {
			searchTerm = '';
			loadOptions('');
		}
	}

	onDestroy(() => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
	});
</script>

<Popover.Root
	bind:open
	onOpenChange={(isOpen) => {
		handleOpenChange(isOpen);
	}}
>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class={cn('justify-between', buttonClass, {
					'text-muted-foreground': !selectedValue,
					'border-destructive': showError
				})}
				{...props}
				role="combobox"
				aria-label={placeholder}
				aria-expanded={open}
				aria-required={required}
			>
				{#if selectedValue}
					{#if selectedValue.length > 22}
						{selectedValue.slice(0, 22)}...
					{:else}
						{selectedValue}
					{/if}
				{:else}
					{placeholder}{required ? ' *' : ''}
				{/if}
				<ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class={cn('p-0', buttonClass)} align="start">
		<Command.Root shouldFilter={false}>
			<Command.Input
				placeholder={searchPlaceholder}
				bind:value={searchTerm}
				oninput={(e) => handleSearch(e.currentTarget.value)}
			/>
			<Command.List>
				{#if isLoading}
					<Command.Group>
						<Command.Item disabled value="loading">
							{loadingText}
						</Command.Item>
					</Command.Group>
				{:else if options.length === 0}
					<Command.Empty>{emptyText}</Command.Empty>
				{:else}
					<Command.Group>
						{#each options as option (option.value)}
							<Command.Item
								value={option.value}
								onSelect={() => {
									handleSelect(option.value);
								}}
							>
								<Check
									class={cn('mr-2 size-4', selectedOption !== option.value && 'text-transparent')}
								/>
								{option.label}
							</Command.Item>
						{/each}
					</Command.Group>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
